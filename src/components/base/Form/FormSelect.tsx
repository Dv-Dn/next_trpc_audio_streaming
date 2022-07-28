import { useOnClickOutside } from "@/hooks";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { ChevronDown } from "tabler-icons-react";
import { CSSTransition } from "react-transition-group";
import clsx from "clsx";

interface FormSelectProps {
  // onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  label?: string;
  children?: ReactNode[] | ReactNode;
}

// TODO: add error styles, message, disabled status.

const FormSelect = ({ label, children, value }: FormSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Required for CSSTransition to run in react strict mode
  const listRef = useRef(null);

  const selectRef = useOnClickOutside<HTMLDivElement>(
    () => isOpen && setIsOpen(false)
  );

  useEffect(() => {
    isOpen && setIsOpen(false);
  }, [value]);

  const toggleClick = () => setIsOpen(!isOpen);

  return (
    <div
      ref={selectRef}
      className="form-select relative text-sm text-gray-900 "
    >
      {/* <span className="mb-8">ASDASdsad</span> */}
      {label && <span className="mb-2">{label}</span>}
      {value && (
        <div
          className="mb-2 flex w-full cursor-pointer items-center justify-between overflow-hidden rounded-lg border   border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          onClick={toggleClick}
        >
          <div className="h-full w-full border-none p-3">{value}</div>
          {/* TODO: add autocomplete  */}
          {/* <input
            type="text"
            value={value}
            // readOnly
            className="h-full border-none p-3 w-full"
          /> */}
          <ChevronDown
            size={20}
            className={clsx(
              "absolute top-1/2 right-2 -translate-y-1/2 transition-transform duration-200",
              {
                "rotate-180": isOpen,
              }
            )}
          />
        </div>
      )}

      <CSSTransition
        in={isOpen}
        classNames="fade"
        timeout={500}
        mountOnEnter
        unmountOnExit
        nodeRef={listRef}
      >
        <ul
          className="absolute z-10  max-h-56 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg"
          ref={listRef}
        >
          {children}
        </ul>
      </CSSTransition>
    </div>
  );
};

export { FormSelect };
