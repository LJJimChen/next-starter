import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Navbar from './navbar'

type HeaderProps = {}

export default function Header({}: HeaderProps) {
    return (
        <Row>
            <Col>logo</Col>
            <Col md={5}>
                <Navbar></Navbar>
            </Col>
        </Row>
    )
}
