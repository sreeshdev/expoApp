import React from "react";
import { Dialog, SizableText, Spinner, XStack } from "tamagui";

const Loader = ({ show }) => {
  return (
    <Dialog defaultOpen={false} open={show} key={"LOADER_DIALOG"}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <XStack space>
            <Spinner key={"API_LOADER"} size="small" color="$green10" />
            <SizableText theme="alt1" size="$3">
              Loading
            </SizableText>
          </XStack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};

export default Loader;
