import { HeaderProps } from '@/types';

const Header = ({ name, butttonComponent, isSmallText }: HeaderProps) => {
  return (
    <div className="mb-2 flex w-auto items-center justify-between">
      <h1 className={`${isSmallText ? 'text-lg' : 'text-2xl font-semibold'}`}>
        {name}
      </h1>

      {butttonComponent}
    </div>
  );
};

export default Header;
