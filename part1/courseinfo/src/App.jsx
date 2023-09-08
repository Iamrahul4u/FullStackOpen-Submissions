const Content = ({ course }) => {
  const { parts } = course;
  console.log(parts);
  return (
    <div>
      <Part part={parts[0].name} exercise={parts[0].exercise} />
      <Part part={parts[1].name} exercise={parts[1].exercise} />
      <Part part={parts[2].name} exercise={parts[2].exercise} />
    </div>
  );
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};
const Header = (props) => {
  const { course } = props;
  return <h1>{course.name}</h1>;
};
const Total = ({ course }) => {
  const { parts } = course;
  return (
    <p>
      Number of exercises{" "}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />

      <Total course={course} />
    </div>
  );
};

export default App;
