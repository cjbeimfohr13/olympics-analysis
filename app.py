import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sql_keys import username, password
from flask import Flask, jsonify, render_template
import jinja2

# Project 2 Olympic Gold Medal USA Athlete Winners

#################################################
# Database Setup
#################################################
engine = create_engine(f'postgresql://{username}:{password}@localhost:5432/olympics')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Athlete = Base.classes.athlete

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/names<br/>"
        f"/api/v1.0/sport<br/>"
        f"/api/v1.0/athletes<br/>"
        f"/api/v1.0/data<br/>"
    
    )

@app.route("/api/v1.0/names")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all athlete names"""
    # Query all athlete names
    results = session.query(Athlete.name).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)

@app.route("/api/v1.0/sport")
def sport():
        # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all sport in the database"""
    # Query all Olympic sports
    results = session.query(Athlete.sport).all()

    session.close()

    # Convert list of tuples into normal list
    all_sports = list(np.ravel(results))

    return jsonify(all_sports)

@app.route("/api/v1.0/athletes")
def athletes():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of athlete data including the year, sport, sex, nationality, medal, name of each athlete"""
    # Query all athletes
    results = session.query(Athlete.year, Athlete.sport, Athlete.sex, Athlete.nationality, Athlete.medal, Athlete.name).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_athletes = []
    for year, sport, sex, nationality, medal, name in results:
        olympic_dict = {}
        olympic_dict["year"] = year
        olympic_dict["sport"] = sport
        olympic_dict["sex"] = sex
        olympic_dict["nationality"] = nationality
        olympic_dict["medal"] = medal
        olympic_dict["name"] = name
        all_athletes.append(olympic_dict)

    return render_template(index.html, all_athletes=all_athletes)

@app.route("/api/v1.0/data")
def data():
    session = Session(engine)

    table= session.query(Athlete)

    print(table)
    return render_template("data.html", table=table)


if __name__ == '__main__':
    app.run(debug=True)