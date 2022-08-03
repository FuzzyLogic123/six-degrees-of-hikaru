import { ReactComponent as SharpArrow } from "../../svg/sharpArrow.svg";

function TripleSharpArrow() {
    return (
        <div class="flex flex-column">
            <SharpArrow class="-m-0.5 stroke-white fill-white stroke-1"/>
            <SharpArrow class="-m-0.5 stroke-white fill-white stroke-1"/>
            <SharpArrow class="-m-0.5 stroke-white fill-white stroke-1"/>
        </div>
    );
}

export default TripleSharpArrow;