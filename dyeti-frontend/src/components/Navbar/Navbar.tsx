import { useState } from 'react';
import * as Ui from './Navbar.styles';
import dyetiLogo from '../../assets/dyeti-logo.svg';
import { useAuth } from '@/context';
import AuthSection from './components/AuthSection';

type NavItem = {
  route: string;
  label: string;
  protected?: boolean;
};

const navItems: NavItem[] = [
  { route: '/', label: 'Home', protected: true },
  { route: '/plans', label: 'Plans', protected: true },
  { route: '/preferences', label: 'Preferences', protected: true },
  { route: '/products', label: 'Products', protected: true },
  { route: '/account', label: 'Account', protected: true },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const visibleNavItems = navItems.filter(item => !item.protected || isLoggedIn);

  return (
    <>
      <Ui.Container>
        <Ui.HomepageLink to="/">
          <Ui.Logo src={dyetiLogo} alt="DYeti logo" />
          <Ui.Title>DYeti</Ui.Title>
        </Ui.HomepageLink>

        <Ui.MenuIconContainer onClick={() => setIsMenuOpen(prev => !prev)}>
          {isMenuOpen ? <Ui.MenuOpenIcon /> : <Ui.MenuIcon />}
        </Ui.MenuIconContainer>

        <Ui.DesktopNav>
          <Ui.DesktopNavList>
            {visibleNavItems.map(item => (
              <li key={item.route}>
                <Ui.DesktopNavLink to={item.route} end>
                  {item.label}
                </Ui.DesktopNavLink>
              </li>
            ))}
          </Ui.DesktopNavList>
          <AuthSection />
        </Ui.DesktopNav>
      </Ui.Container>

      {isMenuOpen && (
        <>
          <Ui.Backdrop onClick={() => setIsMenuOpen(false)} />
          <Ui.MobileMenu>
            <Ui.MobileNav>
              <Ui.MobileNavList>
                {visibleNavItems.map(item => (
                  <li key={item.route}>
                    <Ui.MobileNavLink to={item.route} onClick={() => setIsMenuOpen(false)} end>
                      {item.label}
                    </Ui.MobileNavLink>
                  </li>
                ))}
              </Ui.MobileNavList>
              <AuthSection />
            </Ui.MobileNav>
          </Ui.MobileMenu>
        </>
      )}
    </>
  );
};

export default Navbar;
