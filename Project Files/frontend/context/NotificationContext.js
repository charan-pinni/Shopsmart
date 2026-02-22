import { createContext, useState, useCallback } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = "success") => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }]);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 3000);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div className="toast-container">
                {notifications.map((n) => (
                    <div key={n.id} className={`toast ${n.type}`}>
                        <span>{n.type === "success" ? "✅" : "❌"}</span>
                        {n.message}
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};
