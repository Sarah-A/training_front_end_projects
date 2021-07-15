const Pet = (props) => {
  return (
    <div>
      <h1>Name: {props.name}</h1>
      <h2>Animal: {props.animal}</h2>
      <h2>Breed: {props.breed}</h2>
    </div>
  );
};

export default Pet;
