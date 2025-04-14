export interface Instructor {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export interface Course {
  id: number;
  name: string;
  level: string;
  description: string;
}

export interface Lecture {
  id: number;
  instructorName: string;
  courseName: string;
  date: string;
  time: string;
  duration: string;
}