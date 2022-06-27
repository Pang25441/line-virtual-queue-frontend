import React from "react";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";

import OriginProps from "../../models/util/OriginProps";

interface Props extends OriginProps { href: string; variant?: string }

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
