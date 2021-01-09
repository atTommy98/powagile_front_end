import "./ProductTitle.css";

export default function ProductTitle(props) {
  const { title = "Your product name here", children = null } = props;

  return (
    <div>
      <h2 className="pageTitle" style={{ textAlign: "center" }}>
        <span className="companyName">Pow!Agile</span>{" "}
        <span className={"productName" + title}>{title}™</span>
      </h2>
      {children}
    </div>
  );
}
