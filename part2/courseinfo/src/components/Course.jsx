const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};
const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => {
        return <Part key={index} part={part} />;
      })}
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <h3>total of {total} exercises</h3>
    </>
  );
};

const Courses = ({ courses }) => {
  return (
    <>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        );
      })}
    </>
  );
};

export default Courses;
