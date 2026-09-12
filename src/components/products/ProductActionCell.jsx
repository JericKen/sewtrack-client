import Button from "../ui/Button";

export default function ActionCell({ product, onHandleUpdate, onHandleDelete }) {
    return (
        <div className="flex justify-center items-center gap-[20px] w-[300px] p-1">
            <Button onHandleClick={onHandleUpdate}>
                Update
            </Button>
            <Button onHandleClick={onHandleDelete}>
                Delete
            </Button>
        </div>
    );
}