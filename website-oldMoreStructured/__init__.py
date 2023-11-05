from flask import Flask, g
import sqlite3

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "MINHACASAEMUNIQUE"

    @app.teardown_appcontext
    def close_db(error):
        db = getattr(g, '_database', None)
        if db is not None:
            if error is not None:
                # Handle the error, log it, or perform specific actions based on the error
                print(f"An error occurred: {error}")
            db.close()

    from .views import views
    from .creator import creator

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(creator, url_prefix='/')

    return app