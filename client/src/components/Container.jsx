function Container(props) {
  return (
    <>
      <div className="form_container">
        <label htmlFor={props.name} className="form_label">
          {props.label}
        </label>
        <input
          type={props.type}
          id={props.name}
          name={props.name}
          className="form_input"
          placeholder={props.placeholder}
        />
        <p className="form_message"></p>
      </div>
    </>
  );
}

export default Container;
