import React from "react";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
// eslint-disable-next-line @next/next/no-document-import-in-page
import { OriginProps } from "next/document";

interface Props extends OriginProps { href: string; variant: string }

const Link: React.FC<Props> = (props) => {
    return (
        <NextLink href={props.href} passHref>
            <MuiLink>
                {props.children}
            </MuiLink>
        </NextLink>
    );
};

export default Link;
