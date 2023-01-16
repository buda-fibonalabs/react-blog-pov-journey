export function ContainerLayoutComponent(props) {
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

export function AbstractedContainerLayoutComponent(props) {
  // we can create an abstraction here because enough modules are doing the same
  // thing so placing the logic in one place can significantly simplify its use
  function countSomethingLocal() {}
  function clickHandler() {}
  function getData() {}

  return (
    <ContainerLayoutComponent
      data={getData}
      onClick={clickHandler}
      count={countSomethingLocal}
    />
  );
}

function parent(props) {
  return (
    <>
      {/*AbstractedContainerLayoutComponent is much simpler to use */}
      <AbstractedContainerLayoutComponent />
    </>
  );
}
