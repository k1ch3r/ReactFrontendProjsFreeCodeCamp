
import {useState} from "react";
import data from "./data";
import "./styles.css";

export default function Accordion() {

    const [selected, setSelected] = useState(null);
    const [enableMultiSelect, setEnableMultiselect] = useState(false);
    const [multiple, setMultiple] = useState([])

    function handleSingleSelection(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId);
        console.log(getCurrentId, "selected");
    }

    function handleMultiSelect(getCurrentId) {
        let copiedMultiple = [...multiple];
        const indexOfCurrentId = copiedMultiple.indexOf(getCurrentId);
        console.log("clicked Id currently has index", indexOfCurrentId);
        if(indexOfCurrentId === -1) copiedMultiple.push(getCurrentId);
        else copiedMultiple.splice(indexOfCurrentId, 1);

        setMultiple(copiedMultiple);
    }

    console.log(selected, multiple);

    return <div className="wrapper">

        <button onClick={() => {
            setEnableMultiselect(!enableMultiSelect);
            setMultiple([]);
            setSelected(null)
        }
        }>
            Toggle multi-selection
        </button>

        <div className="accordion">
            {
                data && data.length > 0 ?
                    (data.map(dataItem =>
                    <div className="item">
                        <div
                            onClick={
                            enableMultiSelect
                                ? () => handleMultiSelect(dataItem.id)
                                : () => handleSingleSelection(dataItem.id)}
                            className="title"
                        >
                            <h3>{dataItem.question}</h3>
                            <span>+</span>
                        </div>
                        {
                            selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ?
                            <div
                                className="content"
                            >
                                { dataItem.answer }
                            </div>
                                : null
                        }
                    </div>)

                ) : (
                        <div>"No data found</div>
                    )
            }
        </div>


    </div>

}