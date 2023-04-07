import { Container, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap"
import React, { Component, useState, useEffect } from "react"
import hr from '../images/hr.png'
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import Dashbord from "./Dashbord";
import Departments from "./Departments";
import Employees from "./Employees";
import { Department, Employee } from "../../../server/node_modules/.prisma/client"
import { DepartmentData } from "../types/types"

interface IProps {
    departments: DepartmentData;
}

function Menu(data: DepartmentData) {
    return (
        <>

            <Router>
                <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                            <img src={hr} height={30} width={30} className="d-inline-block align-top" alt="Logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse>
                            <Nav className="me-auto">
                                <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link as={NavLink} to="/departments">Departments</Nav.Link>
                                <Nav.Link as={NavLink} to="/employees">Employees</Nav.Link>
                            </Nav>
                            <Form className="d-flex">
                                <FormControl type="text" placeholder="Search" className="mr-sm-2m" />
                                <Button variant="outline-info">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Routes>
                    <Route path="/" element={<div />} />
                    <Route path="/dashboard" element={<Dashbord />} />
                    <Route path="/departments" element={<Departments departments={data} />} />
                    <Route path="/employees" element={<Employees />} />
                </Routes>
            </Router>
        </>
    )
}

export default Menu;