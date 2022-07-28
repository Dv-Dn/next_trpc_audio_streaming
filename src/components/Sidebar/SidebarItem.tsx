import { ComponentType } from "react";
import { ReactElement } from "react";
// import { ICon } from 'tabler-icons-react';
import type { IconProps } from "tabler-icons-react";

interface SidebarItemProps {
  onClick?: () => void;
  iconSize?: number;
  icon?: ComponentType<IconProps>;
  text: string;
}

export const SidebarItem = ({
  onClick,
  icon: Icon,
  text,
  iconSize,
}: SidebarItemProps) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-md py-2 px-2 text-sm font-medium text-gray-700 transition duration-500 ease-in-out hover:scale-105 hover:bg-primary hover:text-white"
    >
      {Icon && <Icon className="mr-1 inline-block" size={iconSize || 24} />}

      <span>{text}</span>
    </div>
  );
};
