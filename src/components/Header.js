import React, { useState } from "react";

export default function Header() {
  return (
    <>
      <nav className="navbar bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand text-secondary" href="/#">
            Navbar
          </a>
          <ul className="nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link text-secondary"
                data-bs-toggle="dropdown"
                href="/#"
                role="button"
                aria-expanded="false"
              >
                <i className="bi bi-list" style={{ fontSize: "2rem" }} />
              </a>
              <ul className="dropdown-menu bg-primary dropdown-menu-end">
                <List props="dropdown-item text-secondary" href="/#">
                  Conjugation Trainer
                </List>
                <List props="dropdown-item text-secondary" href="/#">
                  Conjugation Tables
                </List>
                <hr className="dropdown-divider bg-secondary" />
                <List props="dropdown-item text-secondary" href="/#">
                  Info
                </List>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

function List({ props, href, children }) {
  return (
    <>
      <li>
        <a className={props} href={href}>
          {children}
        </a>
      </li>
    </>
  );
}
