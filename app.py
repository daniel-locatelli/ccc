import os
import requests

from datetime import datetime
from flask import Flask, flash, redirect, render_template, request, session, jsonify
from flask_session import Session
import sqlite3

app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        return None
    else:
        return render_template("index.html")
    

@app.route("/component-assemblies", methods=["GET", "POST"])
def assemblies():
    if request.method == "POST":
        return None
    else:
        # Loading database
        connection = sqlite3.connect('buildsystems.db')
        db = connection.cursor()

        assembly_ids_query = "SELECT id FROM assembly"
        db.execute(assembly_ids_query)
        assembly_ids = db.fetchall()
        assembly_ids = [id[0] for id in assembly_ids]
        
        db.close()
        connection.close()

        # render and return assembly_ids
        return render_template("component-assemblies.html", assembly_ids=assembly_ids)


@app.route("/creator", methods=["GET", "POST"])
def creator():
    if request.method == "POST":
        return render_template("creator.html")
    else:
        # Loading database
        connection = sqlite3.connect('buildsystems.db')
        db = connection.cursor()

        component_ids_query = "SELECT id FROM component"
        db.execute(component_ids_query)
        component_ids = db.fetchall()
        component_ids = [id[0] for id in component_ids]
        
        db.close()
        connection.close()

        return render_template("creator.html", component_ids=component_ids)


@app.route("/api/component", methods=["POST"])
def component_request():
    data = request.get_json()
    selected_value = data.get("data")
    # Loading database
    connection = sqlite3.connect('buildsystems.db')
    db = connection.cursor()

    query = "SELECT sub_assembly_id FROM component WHERE id = ?"
    db.execute(query, (selected_value,))
    assembly_ids = db.fetchall()
    assembly_ids = [id[0] for id in assembly_ids]
    
    print(assembly_ids)
    db.close()
    connection.close()

    response_data = {'message': f'Selected value received: {assembly_ids}'}
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)

