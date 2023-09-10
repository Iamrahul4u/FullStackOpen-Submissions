const Header = ({ courses }) => <h1>{courses.name}</h1>;

const Total = ({ parts }) => {
  const sum = parts.reduce((acc, cur) => acc + cur.exercises, 0);
  return (
    <strong>
      <p>total of {sum} exercises</p>
    </strong>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ courses }) => {
  const parts = courses.parts;
  return (
    <div>
      <Header courses={courses} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default Course;
