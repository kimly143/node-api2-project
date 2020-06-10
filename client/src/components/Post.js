import React from 'react';
import { Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';

export default function Post({ post }) {
    return (
        <Col>
            <Card className="post">
                <CardBody>
                    <CardTitle><strong>{post.title}</strong></CardTitle>
                    <CardText>{post.contents}</CardText>
                </CardBody>
            </Card>
        </Col>
    )
}