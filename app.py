import os
import requests

from datetime import datetime
from flask import Flask, flash, redirect, render_template, request, session
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
        # render and return assembly_ids
        return render_template("creator.html")


if __name__ == '__main__':
    app.run(debug=True)

