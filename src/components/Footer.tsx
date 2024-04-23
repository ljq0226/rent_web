const Footer = () => {
  return (
    <footer className="pb-4 mt-auto text-xs text-center text-gray-500">
      &copy;{new Date().getFullYear()}{' '}
      <a
        className="transition hover:text-blue-600"
        href={`https://github.com/ljq0226`}
      >
        ljq0226
      </a>
    </footer>
  );
};

export default Footer;
