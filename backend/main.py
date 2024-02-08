from website import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)  # set to false at end of semester
