export interface Course {
  id: number;
  title: string;
  description: string;
  duration_min: number;
  image_url: string;
  course_sessions?: CourseSession[];
}

export interface CourseSession {
  id: number;
  course_id: number;
  start_time: string;
  max_participants: number;
  course?: Course;
  bookings?: { count: number }[];
}