import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { BsFillArrowDownCircleFill } from "react-icons/bs";

function Card(props) {
    const styles = {
        textStyle: {
            marginLeft: props.node.level*30,
            color: props.node.level === 1 ? 'rgb(38, 165, 197)' : 'black',
            fontWeight: props.node.level === 1 ? 700 : 250,
            fontSize: props.node.level === 1 ? 20 : 16,
        }
    }
    return (
        <div>
            <div id="card">
                <div id="left-card">
                    <button className="control-buttons tooltip" onClick={() => props.handleUp(props.node)}>
                        <BsFillArrowUpCircleFill />
                        <span className="tooltiptext">Move Up</span>
                    </button>
                    <button className="control-buttons tooltip" onClick={() => props.handleDown(props.node)}>
                        <BsFillArrowDownCircleFill />
                        <span className="tooltiptext">Move Down</span>
                    </button>
                    <button className="control-buttons tooltip" onClick={() => props.handleOutdent(props.node)}>
                        <BsArrowLeft />
                        <span className="tooltiptext tooltip">Outdent</span>
                    </button>
                    <button className="control-buttons tooltip" onClick={() => props.handleIndent(props.node)}>
                        <AiOutlineArrowRight />
                        <span className="tooltiptext">Indent</span>
                    </button>
                    <button className="control-buttons tooltip" onClick={() => props.handleDelete(props.node)}>
                        <RiDeleteBinLine />
                        <span className="tooltiptext">Delete</span>
                    </button>
                </div>

                <div id="right-card">
                    <input
                        style={styles.textStyle}
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