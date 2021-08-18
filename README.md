- Configure absolute paths in react: https://medium.com/@diegosj/configure-absolute-paths-in-react-ba07f5f9d591
- react-perfect-scrollbar https://github.com/goldenyz/react-perfect-scrollbar
- react-draft-wysiwyg: Wysiwyg editor built using ReactJS and DraftJS libraries.
- react-quill: Quill is a free, open source WYSIWYG editor built for the modern web. With its extensible architecture and a expressive API you can completely customize it to fulfill your needs.
- axios-mock-adapter: This explains how to test network requests in React apps. We will be using Jest and Enzyme for our testing stack as well as axios-mock-adapter to mock our requests.
- immer Create the next immutable state tree by simply modifying the current tree

---

- routes + layout

```javascript

{
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/home',
        component: HomeView,
      },
      {
        exact: true,
        path: '/pricing',
        component: lazy(() => import('src/views/pages/PricingView')),
      },
      {
        component: () => <Redirect to='/404' />,
      },
    ],
  },
  // ------
{
  routes.map((route, i) => {
    const Guard = route.guard || Fragment;
    const Layout = route.layout || Fragment;
    const Component = route.component;

    return (
      <Route
        key={i}
        path={route.path}
        exact={route.exact}
        render={(props) => (
          <Guard>
            <Layout>
              {route.routes ? (
                renderRoutes(route.routes)
              ) : (
                <Component {...props} />
              )}
            </Layout>
          </Guard>
        )}
      />
    );
  });
}
```

==> when using NextJs => Create index + layout

# using forwardRef for creating ToolTips

```javascript
import React, { useEffect, useState, useRef, useCallback } from 'react';

const styles = {
  popover: {
    position: 'absolute',
    transform: 'translate(0, -45%)',
    background: '#fff',
    zIndex: 9999,
    border: '1px solid #ccc',
    padding: '10px',
  },
};

function Tooltip({ children, handleShow, type }, ref) {
  const toolRef = useRef(null);
  const [position] = useState(type || 'vertical');
  const [coors, setCoors] = useState({ left: 'auto', top: 'auto' });

  /**
   * Handle event when user keyup
   * @params e Event object when keyup
   * @returns void
   */
  const handleEventKeyup = useCallback(
    (e) => {
      const keys = [27];
      if (keys.includes(e.keyCode)) {
        e.preventDefault();
        handleShow(false);
        window.removeEventListener('keyup', handleEventKeyup, false);
      }
    },
    [handleShow]
  );

  /**
   * Handle event when user click out of portal element
   * If target of click is not in modal portal element, hide current modal.
   * @params e Event object when click
   * @returns void
   */
  const handleClickOutside = useCallback(
    (e) => {
      if (toolRef && toolRef.current && !toolRef.current.contains(e.target)) {
        e.preventDefault();
        handleShow(false);
        window.removeEventListener('click', handleClickOutside, false);
      }
    },
    [handleShow]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleEventKeyup, false);
    document.addEventListener('click', handleClickOutside, false);

    return () => {
      window.removeEventListener('keyup', handleEventKeyup, false);
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, [handleEventKeyup, handleClickOutside]);

  useEffect(() => {
    if (ref && ref.current) {
      const { x, y, scrollTop } = ref.current.getBoundingClientRect();
      let newCoors = { left: 'auto', top: 'auto' };
      if (position === 'vertical') {
        newCoors = { left: x / 2, top: y };
      } else {
        newCoors = {
          left: x + parseFloat(ref.current.offsetWidth || 0),
          top: parseFloat(y) + parseFloat(window.scrollY),
        };
      }
      setCoors(newCoors);
    }
  }, [setCoors, ref, position]);

  return (
    <div
      className='tool-tip'
      ref={toolRef}
      style={{ ...styles.popover, ...coors }}
    >
      {children}
    </div>
  );
}

export default React.forwardRef(Tooltip);
```

## Using

```javascript
<ToolTipsButton
  className='btn btn-light'
  onClick={async () =>
    setValue('internal_number', await _createInternalNumber())
  }
  btnName='Tạo số'
  info='Nếu số nội bộ của phòng ban sau cùng là 105, hệ thống sẽ tạo ra 106.'
/>

//
<ToolTipIcon
  icon="help"
  size="16px"
  color="#2196F3"
  info="Nếu chọn 'Dừng hoạt động', số máy nhánh này sẽ không thể nhận cuộc gọi và cũng không thể thực hiện gọi ra ngoài."
/>
```

# Using forwardRef for create passwordInput

```javascript
import React, { useState } from 'react';
import { IconNoLinkWrapper } from './Icon';
import { randomPassword } from '../helpers/randomPassword';

function PasswordInput(
  { generatorBtn, name, onChange, placeholder = '' },
  ref
) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  function _handleShowPassword() {
    setIsShowPassword(!isShowPassword);
  }
  return (
    <>
      <input
        type={isShowPassword ? 'text' : 'password'}
        className='form-control'
        placeholder={placeholder}
        name={name}
        ref={ref}
      />
      {generatorBtn && (
        <div className='input-group-append'>
          <button type='button' className='btn btn-light btn-icon'>
            <IconNoLinkWrapper
              icon='eye'
              size='16px'
              handleClickIcon={_handleShowPassword}
            />
          </button>
          <button
            className='btn btn-light'
            type='button'
            onClick={() => onChange(name, randomPassword(10))}
          >
            Tạo mật khẩu
          </button>
        </div>
      )}
    </>
  );
}

export default React.forwardRef(PasswordInput);
```

## Using

```javascript
<PasswordInput
  generatorBtn
  name='password'
  ref={register({ required: true })}
  onChange={setValue}
/>
```

```javascript
// + import { useForm } from 'react-hook-form';
//  const { register, handleSubmit, errors, setValue, watch } = useForm();
<PasswordInput
  name='password'
  ref={register({
    required: <p className='text-danger mt-2'>No blank</p>,
    minLength: {
      value: 8,
      message: '>8 characters',
    },
  })}
/>
```

---

# Dropdown

```javascript
import React, { useState } from 'react';
import { IconNoLinkWrapper } from './Icon';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { createUseStyles } from 'react-jss';

const dropdownStyles = createUseStyles({
  actionStylesWrapper: {
    '& .btn-secondary': {
      color: '#777',
      background: 'inherit',
    },
  },
  itemIcon: {
    marginRight: '15px',
  },
});

export const DropdownMenuContent = ({
  toggleIcon,
  handleClickIconWrapper,
  classToggleWrapper,
  DropdownMenuClass,
  children,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function toggle() {
    setDropdownOpen(!dropdownOpen);
  }

  const classes = dropdownStyles({});

  return (
    <>
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        className={classes.actionStylesWrapper}
      >
        <DropdownToggle>
          <IconNoLinkWrapper
            icon={toggleIcon}
            handleClickIcon={handleClickIconWrapper || ''}
            classNameWrapper={classToggleWrapper}
          />
        </DropdownToggle>
        <DropdownMenu className={DropdownMenuClass}>{children}</DropdownMenu>
      </Dropdown>
    </>
  );
};

export const ItemDropdownRender = ({
  itemContent,
  onClickItem,
  iconItem,
  size,
}) => {
  const classes = dropdownStyles({});
  return (
    <>
      <DropdownItem>
        <IconNoLinkWrapper
          size={size}
          handleClickIcon={onClickItem}
          classNameWrapper='dropdown-item'
          icon={iconItem}
          classIcon={classes.itemIcon}
        >
          {itemContent}
        </IconNoLinkWrapper>
      </DropdownItem>
    </>
  );
};
```

## Dropdown item

```javascript
import React from 'react';
import { DropdownMenuContent, ItemDropdownRender } from './DropdownMenu';
import { DropdownItem } from 'reactstrap';

const DropdownButton = ({
  items,
  classToggleWrapper,
  toggleIcon,
  DropdownMenuClass,
  size,
}) => {
  return (
    <DropdownMenuContent
      toggleIcon={toggleIcon}
      classToggleWrapper={classToggleWrapper}
      DropdownMenuClass={DropdownMenuClass}
    >
      {items.map((action, idx) => (
        <React.Fragment key={idx}>
          {(!action.diver && !action.header && (
            <ItemDropdownRender
              size={size}
              itemContent={action.name}
              onClickItem={action.action || ''}
              iconItem={action.icon}
              headerContent={action.headerContent || ''}
              link={action.link}
            />
          )) ||
            (action.diver && <DropdownItem divider />) ||
            (action.header && (
              <DropdownItem header>{action.headerContent}</DropdownItem>
            ))}
        </React.Fragment>
      ))}
    </DropdownMenuContent>
  );
};
export default React.memo(DropdownButton);
```

### Using dropdown

```javascript
const [dropdowns] = useState([
  {
    id: 1,
    name: 'content',
    icon: 'edit',
    action: () => handleActionEmployee('isUpdatingDepartment', true),
  },

  {
    id: 2,
    name: 'content',
    icon: 'edit',
    action: () => handleActionEmployee('isChangingPassword', true),
  },
  {
    id: 3,
    diver: true,
    icon: 'edit',
    action: () => {},
  },
  {
    id: 4,
    name: 'remove',
    icon: 'edit',
    action: () => handleActionEmployee('isRemoving', true),
  },
]);
<DropdownButton
  size='15px'
  toggleIcon='threelines'
  classToggleWrapper='dropdown'
  DropdownMenuClass='dropdown-menu dropdown-menu-right'
  items={dropdowns}
/>;
```

---

# add Google tag --> review 'src/components/page.js'. Remember the structure

```
App.js
│   import { createBrowserHistory } from 'history';
│   <Router history={history}>
│      <Routes />
│    </Router>
└───layout.js
    │   Nav
    │   children
    └─────page.js
            │ track
            │ Helmet
            │ import { useLocation } from 'react-router';
```
