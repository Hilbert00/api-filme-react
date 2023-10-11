export default function Container(props) {
    return <div className={`max-w-[95%] mx-auto ${props.className ?? ""}`}>{props.children}</div>;
}
