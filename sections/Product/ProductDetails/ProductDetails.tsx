export default function ProductDetails() {
    const test = [
        { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
        { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
        { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
        { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
        { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
        { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
        { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
        { firstText: "Alto empaquetado (cm)", secondText: "193,3" },
    ];

    return (
        <div className="w-full max-w-[65rem] mx-auto">
            <ul>
                {test.map((item) => {
                    return (
                        <li className="even:bg-gray-200 flex justify-between items-center p-2 text-sm">
                            <span className="text-[#323333]">
                                {item.firstText}
                            </span>
                            <span className="text-[#848585]">
                                {item.secondText}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}