import Button from "../ui/Button";

export default function PageHeader({ title, buttonText, user, onHandleAdd, onHandleLogout }) {
    return (
        <div className="flex justify-between items-center p-6 mb-6 bg-[#f1f1f1] shadow">
            <h3 className="">{title}</h3>
            <div>
                <Button 
                    variant="accent" 
                    className="btn-small mr-3"
                    onHandleClick={onHandleAdd}>
                    {buttonText}
                </Button>   
                <Button 
                    variant="secondary"
                    className="btn-small"
                    onHandleClick={onHandleLogout}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
}