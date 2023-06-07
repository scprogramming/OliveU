import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="OliveU",
    user="postgres",
    password="element13")

courses = open('courses.csv', 'r')
courseLines = courses.readlines()
cur = conn.cursor()

for line in courseLines:
    fields = line.split("|")
    cur.execute("INSERT INTO courses VALUES (%s,%s,%s,%s,%s,%s,%s)",
                (fields[0], fields[1], fields[2], fields[3], fields[4], fields[5], fields[6]))
    conn.commit()

modules = open('modules.csv', 'r')
moduleLines = modules.readlines()

for line in moduleLines:
    fields = line.split("|")
    cur.execute("INSERT INTO modules VALUES (%s,%s,%s)",
                (fields[0], fields[1], fields[2]))
    conn.commit()

lessons = open('lessons.csv', 'r')
lessonLines = lessons.readlines()

for line in lessonLines:
    fields = line.split("|")
    cur.execute("INSERT INTO lessons VALUES (%s,%s,%s,%s,%s,%s)",
                (fields[0], fields[1], fields[2],fields[3],fields[4],fields[5]))
    conn.commit()

cur.close()