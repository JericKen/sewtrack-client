import Button from "../ui/Button";

export default function PageHeader({ title, buttonText, onHandleAdd}) {
    return (
        <div className="flex justify-between items-center p-6 mb-6 bg-[#f1f1f1] shadow">
            <h3 className="">{title}</h3>
            <Button onHandleClick={onHandleAdd}>
                {buttonText}
            </Button>
        </div>
    );
}