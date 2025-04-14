export interface Instructor {
  _id: string;
  name: string;
  phone: string;
  email: string;
}

export interface Course {
  id: string;
  name: string;
  level: string;
  description: string;
}

export interface Lecture {
  id: string;
  instructorName: string;
  courseName: string;
  date: string;
  time: string;
  duration: string;
}
