import React from "react";
import emptyStateImage from "../assets/empty-state.svg";
// import emptyStateImage from "../assets/empty-state.png"; 

const EmptyState = ({
    image = emptyStateImage,
    title = "No records found",
    description = "Get started by creating a new task to see it here.",
    children
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-10 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 transition-all duration-300 hover:border-gray-300 dark:bg-slate-800 dark:border-slate-700">

            <img src={image} alt={title} className="w-48 h-auto max-w-[80%] mb-6 drop-shadow-sm" loading="lazy"/>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>

            <p className="text-sm text-gray-500 max-w-sm mb-6 dark:text-slate-400 leading-relaxed">
                {description}
            </p>

            {children && (
                <div className="mt-2">
                    {children}
                </div>
            )}

        </div>
    );
};

export default EmptyState;