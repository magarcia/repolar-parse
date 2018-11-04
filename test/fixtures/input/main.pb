# A heading

Just a note, I've found that I can't test my markdown parser vs others.
For example, both _markdown.js_ and /showdown/ code blocks in lists wrong. They're
also completely [inconsistent][test] with regards to paragraphs in list items.

A link. Not anymore.

This will make me fail the test because
markdown.js doesn't acknowledge arbitrary html blocks

* List Item 1
* List Item 2
* List Item 3
* List Item 4

Paragraph.

> * bq Item 1
> * bq Item 2
>   * New bq Item 1
>   * New bq Item 2
>   Text here

---

> Another blockquote!
> I really need to get
> more creative with
> mockup text..
> markdown.js breaks here again

## Another Heading

Hello *world*. Here is a [link](//hello).
And an image ![alt](src "a title").
And an image with an empty alt attribute ![](src).

```
    Code goes here.
    Lots of it...
```

## Shoping list

- bread
+ milk
- water
- apples
- avocado
+ cookies
+ donuts