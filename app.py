import os
import requests

from datetime import datetime
from flask import Flask, flash, redirect, render_template, request, session, jsonify, g
from flask_session import Session
import sqlite3

app = Flask(__name__)
app.config['DATABASE'] = 'buildsystems.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(app.config['DATABASE'])
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_db(error):
    db = getattr(g, '_database', None)
    if db is not None:
        if error is not None:
            # Handle the error, log it, or perform specific actions based on the error
            print(f"An error occurred: {error}")
        db.close()

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
    

@app.route("/creator", methods=["GET", "POST"])
def creator():
    if request.method == "POST":
        return render_template("creator.html")
    else:
        # Loading database
        db = get_db()
        cursor = db.cursor()
        component_ids_query = "SELECT id FROM component"
        cursor.execute(component_ids_query)
        component_ids = cursor.fetchall()
        component_ids = [id[0] for id in component_ids]
        cursor.close()

        return render_template("creator.html", component_ids=component_ids)


@app.route("/api/component", methods=["POST"])
def component_request():
    # Get string from the frontend
    data = request.get_json()
    selectedComponent = data.get("data")

    # Get component as a dictionary
    compQuery = "SELECT * FROM component WHERE id = ?"
    db = get_db()
    cursor = db.cursor()
    cursor.execute(compQuery, (selectedComponent,))
    compQueryResult = cursor.fetchall()
    cursor.close()
    dictComp = [dict(row) for row in compQueryResult][0]

    # Get IDs of assemblies used in the component
    superID = dictComp["super_assembly_id"]
    mainID = dictComp["main_assembly_id"]
    subID = dictComp["sub_assembly_id"]

    # General query for assemblies
    assQuery = "SELECT * FROM assembly WHERE id = ?"
    # Get super
    db = get_db()
    cursor = db.cursor()
    cursor.execute(assQuery, (superID,))
    superResult = cursor.fetchall()
    cursor.close()
    if superResult is not None:
        dictSuperAss = [dict(row) for row in superResult][0]
    # Get main
    db = get_db()
    cursor = db.cursor()
    cursor.execute(assQuery, (mainID,))
    mainResult = cursor.fetchall()
    cursor.close()
    if mainResult is not None:
        dictMainAss = [dict(row) for row in mainResult][0]
    # Get sub
    db = get_db()
    cursor = db.cursor()
    cursor.execute(assQuery, (subID,))
    subResult = cursor.fetchall()
    cursor.close()
    if subResult is not None:
        dictSubAss = [dict(row) for row in subResult][0]


    # General query for layers
    layQuery = "SELECT * FROM layer WHERE assembly_id = ?"
    # Get super layers
    db = get_db()
    cursor = db.cursor()
    cursor.execute(layQuery, (superID,))
    supLayRes = cursor.fetchall()
    cursor.close()
    if supLayRes is not None:
        dictSupLay = [dict(row) for row in supLayRes]
    # Get main layers
    db = get_db()
    cursor = db.cursor()
    cursor.execute(layQuery, (mainID,))
    mainLayRes = cursor.fetchall()
    cursor.close()
    if mainLayRes is not None:
        dictMainLay = [dict(row) for row in mainLayRes]
    # Get super layers
    db = get_db()
    cursor = db.cursor()
    cursor.execute(layQuery, (subID,))
    subLayRes = cursor.fetchall()
    cursor.close()
    if subLayRes is not None:
        dictSubLay = [dict(row) for row in subLayRes]

    
    # Add layers to assemblies
    dictSuperAss["layers"] = dictSupLay
    dictMainAss["layers"] = dictMainLay
    dictSubAss["layers"] = dictSubLay


    # Add assemblies to component
    dictComp["super_assembly"] = dictSuperAss
    dictComp["main_assembly"] = dictMainAss
    dictComp["sub_assembly"] = dictSubAss

    return jsonify(dictComp)


if __name__ == '__main__':
    app.run(debug=True)

