from flask import Blueprint, g, render_template, request
import sqlite3

# Here go the routes

creator = Blueprint("creator", __name__)

def get_db():
        db = getattr(g, '_database', None)
        if db is None:
            db = g._database = sqlite3.connect('website/buildsystems.db')
            db.row_factory = sqlite3.Row
            return db


@creator.route("/creator", methods=["GET", "POST"])
def init():
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

