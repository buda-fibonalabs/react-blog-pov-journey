export function ContainerLayoutComponent(props) {
  const [defaultState, setDefaultState] = useState(props.defaultState);
  /* Implement reusable layout */
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <span style={{ paddingLeft: "5px" }}>{props.data.label}</span>
      </div>
      <div className="detail-tag-label">
        <h3>{props.data.data}</h3>
      </div>
    </div>
  );
}

// used in parent component as such
function ParentComponent(props) {
  function handleClick(e) {
    e.preventDefault();
    console.log("called from parent ");
  }
  function getData() {}
  return (
    <>
      <ContainerLayoutComponent
        onClick={(e) => handleClick(e)}
        data={getData}
        label={"new Lable"}
      />
    </>
  );
}
