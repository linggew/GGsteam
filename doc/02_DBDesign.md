# Database Design
## UML Diagram
![UML](./image/cs411-pt1-stage2-uml.png)

## Description

## Normalization

For the sake of simplicity, all attributes that are only related to one key are summarized as `xxx_attr`

$R(pc\\_id, pc\\_attr, user\\_id, user\\_attr, preference\\_id, preference\\_attr, review\\_id, review\\_attr, query\\_id, game\\_attr, category\\_id, category\\_attr)$

### FDs

$pc\\_id \to pc\\_attr$; \
$user\\_id \to user\\_attr, pc\\_id, preference\\_id$; \
$preference\\_id \to preference\\_attr$; \
$review\\_id \to review\\_attr$; \
$query\\_id \to game\\_attr, category\\_id$; \
$category\\_id \to category\\_attr$; \
$user\\_id, query\\_id \to review\\_id$

## Relational Schema