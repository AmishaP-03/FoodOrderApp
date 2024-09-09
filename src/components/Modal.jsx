import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({children, open, cssClass}) {
    const dialog = useRef();

    // To open the dialog programatically
    useEffect(() => {
        const modal = dialog.current;
        if (open) {
            modal.showModal();
        }

        return () => modal.close(); // clean-up function after useEffect is done executing
    }, [open]);

    return createPortal( // so that we can inject this modal in the rquired place in DOM
        <dialog ref={dialog} className={`${cssClass} modal`}>{children}</dialog>,
        document.getElementById("modal")
    );
}