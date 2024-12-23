import { HeaderProps } from '@/types';

const Header = ({ name, butttonComponent, isSmallText }: HeaderProps) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1 className={`${isSmallText ? 'text-lg' : 'text-2xl font-semibold'}`}>
        {name}
      </h1>

      {butttonComponent}
    </div>
  );
};

export default Header;
