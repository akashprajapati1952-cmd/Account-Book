import { connect, type ConnectedProps } from "react-redux";
import { userSelector } from "../selectors/userSelectors";
import type { State } from "../store/store";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ user }: Redux_props) => {
  const navigate = useNavigate();

  return (
    <header
      className="
        sticky
        top-0
        z-50

        flex
        h-16
        items-center
        justify-between

        px-4

        bg-linear-to-r
        from-indigo-600
        via-violet-600
        to-purple-600

        text-white

        shadow-lg
      "
    >
      {/* Logo */}
      <div>
        <h1 className="text-xl font-bold tracking-wide">
          Account Book
        </h1>

        <p className="text-xs text-indigo-100">
          Manage customer transactions
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link
          to="/about"
          className="
          
            sm:block

            rounded-lg

            px-3
            py-1.5

            text-sm
            font-medium

            transition-all

            hover:bg-white/20
          "
        >
          About
        </Link>

        <button
          type="button"
          aria-label="Open profile"
          title="Open profile"
          onClick={() => navigate("/userProfile")}
          className="
            rounded-full

            transition-all
            duration-200

            hover:scale-105
            hover:shadow-xl
          "
        >
          <img
            className="
              h-11
              w-11

              rounded-full

              border-2
              border-white

              object-cover

              shadow-md
            "
            src={user.img ? user.img : "/face.png"}
            alt="Profile"
          />
        </button>
      </div>
    </header>
  );
};

const mapStateToProps = (state: State) => ({
  user: userSelector(state),
});

const mapDispatchToProps = {};

const connectedComp = connect(
  mapStateToProps,
  mapDispatchToProps
);

type Redux_props = ConnectedProps<typeof connectedComp>;

export default connectedComp(Header);