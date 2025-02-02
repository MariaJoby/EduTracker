from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Mock Data (In real-world, you'd use a database)
students = []
courses = []
grades = []

@app.route('/')
def index():
    return render_template('index.html')

# --- Students Routes ---
@app.route('/students', methods=['GET', 'POST'])
def students_route():
    if request.method == 'POST':
        # Add new student
        student_name = request.form['name']
        student_email = request.form['email']
        students.append({'name': student_name, 'email': student_email})
        return jsonify({'message': 'Student added successfully!'})
    
    # Get all students
    return jsonify(students)

# --- Courses Routes ---
@app.route('/courses', methods=['GET', 'POST'])
def courses_route():
    if request.method == 'POST':
        # Add new course
        course_name = request.form['course_name']
        course_desc = request.form['course_desc']
        courses.append({'name': course_name, 'description': course_desc})
        return jsonify({'message': 'Course added successfully!'})
    
    # Get all courses
    return jsonify(courses)

# --- Grades Routes ---
@app.route('/grades', methods=['POST'])
def grades_route():
    # Assign grade to a student for a course
    student_name = request.form['student_name']
    course_name = request.form['course_name']
    grade = request.form['grade']
    
    grades.append({'student': student_name, 'course': course_name, 'grade': grade})
    return jsonify({'message': 'Grade added successfully!'})

# --- Running the app ---
if __name__ == '__main__':
    app.run(debug=True)
 
