import { BiMove } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

function Card(props) {
    const styles = {
        indent: {
            marginLeft: props.node.level*20,
        }
    }
    return (
        <div>
            <div id="card">
                <div id="left-card">
                    <button className="control-buttons"><BiMove /></button>
                    <button className="control-buttons" onClick={() => props.handleIndent(props.node)}><BsArrowLeft /></button>
                    <button className="control-buttons" onClick={() => props.handleOutdent(props.node)}><AiOutlineArrowRight /></button>
                    <button className="control-buttons" onClick={() => props.handleDelete(props.node)}><RiDeleteBinLine /></button>
                </div>

                <div id="right-card">
                    <input
                        style={styles.indent}
                        id="card-input"
                        type="text"
                        value={props.node.name}
                        placeholder="Type Standard here"
                        onChange={({ target }) => props.handleChange(target.value, props.node)}>
                    </input>
                </div>
            </div>
            <hr></hr>
        </div>
    );
}
export default Card;