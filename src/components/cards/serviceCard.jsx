const ServiceCard = ({Icon,title,body}) => {
    return (
        <div className="flex gap-2">
            {Icon && <Icon className="text-2xl text-primaryColor p-1 h-7 w-14 bg-primaryColor/10" />}
            <div className="flex flex-col gap-2">
                <span className="text-base font-medium">{title}</span>
                <span className="text-xs font-light">{body}</span>
            </div>
        </div>
    );
}
 
export default ServiceCard;