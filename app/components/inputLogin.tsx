import { Brackets, Lock, Mail, Phone, User } from "lucide-react";

interface InputLoginProps {
  children: string;
  htmlFor: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; 
  icon?: React.ReactNode
}

export const InputLogin = ({
  children,
  placeholder,
  htmlFor,
  type,
  icon,
  value,
  onChange,
  onKeyDown
}: InputLoginProps) => {




  return (
    <div className="flex justify-center">
        <div className="flex flex-col">
            <label htmlFor={htmlFor} className="text-rose-800 font-semibold mt-5 mb-1">
                {children}
            </label>

            <div className="flex items-center gap-3">
                <input
                    id={htmlFor}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    className="h-10 w-full text-md font-bold rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />


                {'password' === icon ? < Lock/>
                : 'email' === icon ? <Mail/> 
                : 'user' === icon ? <User/> 
                : 'tel' === icon ? <Phone/> 
                : 'cpf' === icon ? <Brackets/> 
                : ""}

            </div>

        </div>
    </div>
  );
};