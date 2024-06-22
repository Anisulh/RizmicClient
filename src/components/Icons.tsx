import React from "react";
import type { SVGProps } from "react";

export interface IIconProps extends SVGProps<SVGSVGElement> {
  active?: boolean;
}

export function WardrobeIcon({ active = false, ...props }: IIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill={active ? "#CDD6F4" : "#334155"}
        stroke={active ? "#334155" : "#CDD6F4"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 20v2m12-2v2M3 14V8c0-2.828 0-4.243.93-5.121S6.358 2 9.353 2h5.294c2.995 0 4.492 0 5.423.879C21 3.757 21 5.172 21 8v6c0 2.828 0 4.243-.93 5.121S17.642 20 14.647 20H9.353c-2.995 0-4.492 0-5.423-.879C3 18.243 3 16.828 3 14m9 6V2m-3 8v1m6-1v1"
        color="currentColor"
      ></path>
    </svg>
  );
}

export function ShareIcon({ active = false, ...props }: IIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill={active ? "#CDD6F4" : "#334155"}
        stroke={active ? "#CDD6F4" : "#CDD6F4"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 6.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0M9 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0m12 5.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0M8.729 10.75l6.5-3m-6.5 5.5l6.5 3"
        color="#000000"
      ></path>
    </svg>
  );
}

export function EditIcon({ active = false, ...props }: IIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g
        fill={active ? "none" : "none"}
        stroke={active ? "#CDD6F4" : "#CDD6F4"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        color="#000000"
      >
        <path
          color="#000000"
          d="M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3"
        ></path>{" "}
        <path
          color="#000000"
          fill={active ? "#CDD7F4" : "none"}
          d="m16.214 4.982l1.402-1.401a1.982 1.982 0 0 1 2.803 2.803l-1.401 1.402m-2.804-2.804l-5.234 5.234c-1.045 1.046-1.568 1.568-1.924 2.205S8.342 14.561 8 16c1.438-.342 2.942-.7 3.579-1.056s1.16-.879 2.205-1.924l5.234-5.234m-2.804-2.804l2.804 2.804"
        ></path>
      </g>
    </svg>
  );
}
export function SettingIcon({ active = false, ...props }: IIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g
        fill={active ? "#CDD6F4" : "#334155"}
        stroke={active ? "#334155" : "#CDD6F4"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        color="#000000"
      >
        <path d="m21.318 7.141l-.494-.856c-.373-.648-.56-.972-.878-1.101c-.317-.13-.676-.027-1.395.176l-1.22.344c-.459.106-.94.046-1.358-.17l-.337-.194a2 2 0 0 1-.788-.967l-.334-.998c-.22-.66-.33-.99-.591-1.178c-.261-.19-.609-.19-1.303-.19h-1.115c-.694 0-1.041 0-1.303.19c-.261.188-.37.518-.59 1.178l-.334.998a2 2 0 0 1-.789.967l-.337.195c-.418.215-.9.275-1.358.17l-1.22-.345c-.719-.203-1.078-.305-1.395-.176c-.318.129-.505.453-.878 1.1l-.493.857c-.35.608-.525.911-.491 1.234c.034.324.268.584.736 1.105l1.031 1.153c.252.319.431.875.431 1.375s-.179 1.056-.43 1.375l-1.032 1.152c-.468.521-.702.782-.736 1.105s.14.627.49 1.234l.494.857c.373.647.56.971.878 1.1s.676.028 1.395-.176l1.22-.344a2 2 0 0 1 1.359.17l.336.194c.36.23.636.57.788.968l.334.997c.22.66.33.99.591 1.18c.262.188.609.188 1.303.188h1.115c.694 0 1.042 0 1.303-.189s.371-.519.59-1.179l.335-.997c.152-.399.428-.738.788-.968l.336-.194c.42-.215.9-.276 1.36-.17l1.22.344c.718.204 1.077.306 1.394.177c.318-.13.505-.454.878-1.101l.493-.857c.35-.607.525-.91.491-1.234s-.268-.584-.736-1.105l-1.031-1.152c-.252-.32-.431-.875-.431-1.375s.179-1.056.43-1.375l1.032-1.153c.468-.52.702-.781.736-1.105s-.14-.626-.49-1.234"></path>
        <path d="M15.52 12a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0"></path>
      </g>
    </svg>
  );
}

export function ProfileIcon({ active = false, ...props }: IIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g
        fill={active ? "#CDD6F4" : "#334155"}
        stroke={active ? "#334155" : "#CDD6F4"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        color="#000000"
      >
        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"></path>
        <path d="M14.75 9.5a2.75 2.75 0 1 1-5.5 0a2.75 2.75 0 0 1 5.5 0M5.5 19l.56-.98a5 5 0 0 1 4.342-2.52h3.196a5 5 0 0 1 4.342 2.52l.56.98"></path>
      </g>
    </svg>
  );
}

export function FriendsIcon({ active = false, ...props }: IIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill={active ? "#CDD6F4" : "none"}
        stroke={active ? "#334155" : "#CDD6F4"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7a4 4 0 1 1-8 0a4 4 0 0 1 8 0m2 4a4 4 0 0 0 0-8m-4 11H7a5 5 0 0 0-5 5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2a5 5 0 0 0-5-5m6 0a5 5 0 0 1 5 5a2 2 0 0 1-2 2h-1.5"
        color="#000000"
      ></path>
    </svg>
  );
}
export function TrashIcon({ active = false, ...props }: IIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill={active ? "#CDD6F4" : "none"}
        stroke={active ? "#334155" : "#CDD6F4"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m19.5 5.5l-.62 10.025c-.158 2.561-.237 3.842-.88 4.763a4 4 0 0 1-1.2 1.128c-.957.584-2.24.584-4.806.584c-2.57 0-3.855 0-4.814-.585a4 4 0 0 1-1.2-1.13c-.642-.922-.72-2.205-.874-4.77L4.5 5.5M3 5.5h18m-4.944 0l-.683-1.408c-.453-.936-.68-1.403-1.071-1.695a2 2 0 0 0-.275-.172C13.594 2 13.074 2 12.035 2c-1.066 0-1.599 0-2.04.234a2 2 0 0 0-.278.18c-.395.303-.616.788-1.058 1.757L8.053 5.5"
        color="#000000"
      ></path>
    </svg>
  );
}
export function TestTubeIcon({ active = false, ...props }: IIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g
        fill={active ? "#CDD6F4" : "none"}
        stroke={active ? "#334155" : "#CDD6F4"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        color="#000000"
      >
        <path d="M14.54 2v2.486c0 1.748 0 2.622.215 3.461c.213.84.633 1.61 1.472 3.15l1.136 2.088c2.138 3.926 3.207 5.89 2.33 7.345l-.014.022C18.79 22 16.526 22 12 22s-6.79 0-7.68-1.448l-.013-.022c-.877-1.455.192-3.419 2.33-7.345l1.136-2.088c.84-1.54 1.258-2.31 1.472-3.15s.214-1.713.214-3.46V2M9 16.002L9.009 16M15 18.002l.009-.002M8 2h8"></path>
        <path d="M7.5 11.556c1-1.153 2.6-.322 4.5.762c2.5 1.426 4 .332 4.5-.703"></path>
      </g>
    </svg>
  );
}

export function AddIcon({ active = false, ...props }: IIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill={active ? "#8B5CF6" : "#B7D1C1"}
        stroke={active ? "#C4B5FD" : "#446DF6"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m-8-8h16"
        color="#000000"
      ></path>
    </svg>
  );
}

export const EditInactiveIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#B7D1C1"
        stroke="#446DF6"
        strokeWidth="2"
      />
    </svg>
  );
};

export const EditActiveIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
};

export const DeleteInactiveIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#B7D1C1"
        stroke="#446DF6"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#446DF6" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#446DF6" strokeWidth="2" />
    </svg>
  );
};

export const DeleteActiveIcon = (
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
};
