from flask import Blueprint, g, render_template, request
import sqlite3

# Here go the routes

views = Blueprint("views", __name__)

@views.route("/")
def home():
    if request.method == "POST":
        return None
    else:
        return render_template("index.html")