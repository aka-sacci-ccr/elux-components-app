import { useComponent } from "../../sections/Component.tsx";
import { AppContext as BlogContext } from "apps/blog/mod.ts";
import { logger } from "@deco/deco/o11y";
import { clx } from "../../utils/clx.ts";
import Icon from "../ui/Icon.tsx";

export interface Props {
  itemReviewed: string;
  siteTemplate: "elux" | "frigidaire";
  displayToast?: "success" | "error";
  sectionConfig: CommentSection;
}

export interface CommentSection {
  /**
   * @title Textarea properties
   */
  textareaProps: TextareaProps;
  /**
   * @title Name input properties
   */
  nameInputProps: NameInputProps;
  /**
   * @title Email input properties
   */
  emailInputProps: EmailInputProps;
}

interface TextareaProps {
  /**
   * @title Label
   */
  label?: string;
  /**
   * @title Placeholder
   */
  placeholder?: string;
  /**
   * @title Max characters count
   */
  maxLength?: number;
  /**
   * @title Max lines count
   */
  maxLines?: number;
}

interface NameInputProps {
  /**
   * @title Label
   */
  label?: string;
  /**
   * @title Placeholder
   */
  placeholder?: string;
  /**
   * @title Required text
   * @description Used when user try to submit without fill this field
   */
  requiredText?: string;
}

interface EmailInputProps {
  /**
   * @title Label
   */
  label?: string;
  /**
   * @title Placeholder
   */
  placeholder?: string;
  /**
   * @title Required text
   * @description Used when user try to submit without fill this field
   */
  requiredText?: string;
  /**
   * @title Extra text
   */
  extraText?: string;
}

export default function SubmitComment(
  props: Props,
) {
  const { siteTemplate, sectionConfig } = props;
  const { textareaProps, nameInputProps, emailInputProps } = sectionConfig;
  const styling = siteTemplate === "elux" ? ELUX_STYLING : FRIGIDAIRE_STYLING;
  return (
    <>
      <form
        hx-sync="this:replace"
        hx-trigger="submit"
        hx-target="this"
        hx-indicator="this"
        hx-disabled-elt="this"
        hx-swap="outerHTML"
        hx-post={useComponent<Props>(import.meta.url, {
          ...props,
        })}
      >
        <div class="flex flex-col w-full gap-4 sm:gap-6">
          <div class="form-control">
            <label class={styling.label}>
              {textareaProps.label ?? "Comment*"}
            </label>
            <textarea
              class={clx("textarea w-full", styling.textarea)}
              placeholder={textareaProps.placeholder}
              maxLength={textareaProps.maxLength ?? 200}
              rows={textareaProps.maxLines ?? 4}
              name="message"
              id="messageTextarea"
            >
            </textarea>
            <label
              id="charCount"
              class={clx("self-end", styling.charCount)}
            >
              0/{textareaProps.maxLength ?? 200}
            </label>
          </div>
        </div>
        <div class="flex flex-col gap-4 w-full lg:flex-row">
          <div class="form-control w-full">
            <label class={styling.label}>
              {nameInputProps.label}
            </label>
            <input
              type="text"
              placeholder={nameInputProps.placeholder}
              class={styling.input}
              name="personName"
              data-required
              /* hx-on:input={useScript(handleRequiredField, "personName")} */
            />
            <ErrorComponent
              name={"nameControl"}
              text={nameInputProps.requiredText}
            />
          </div>
          <div class="form-control w-full">
            <label class={styling.label}>
              {emailInputProps.label}
            </label>
            <input
              type="text"
              placeholder={emailInputProps.placeholder}
              class={styling.input}
              name="personEmail"
              data-required
              /* hx-on:input={useScript(handleRequiredField, "personEmail")} */
            />
            <label
              class={clx("self-start", styling.extraText)}
            >
              {emailInputProps.extraText}
            </label>
            <ErrorComponent
              name={"emailControl"}
              text={emailInputProps.requiredText}
            />
          </div>
        </div>
      </form>

      {
        /* <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            script,
            TEXTAREA_ID,
            maxLines,
            INPUT_MAXSIZE_ID,
          ),
        }}
      /> */
      }
    </>
  );
}

function ErrorComponent(
  { name, text = "this field is required", id }: {
    name: string;
    text?: string;
    id?: string;
  },
) {
  return (
    <>
      <input
        type="radio"
        class="hidden peer"
        name={name}
        id={id}
      />
      <label
        for={name}
        class="hidden peer-checked:flex flex-row gap-1.5 text-error items-center"
      >
        <Icon id="error-frigidaire" size={16} width={16} height={16} />
        <span class="text-xs">
          {text}
        </span>
      </label>
    </>
  );
}

export async function action(props: Props, req: Request, ctx: BlogContext) {
  const formData = await req.formData();
  const isAnonymous = formData.get("asAnonymous")?.toString();
  const reviewBody = formData.get("textarea")?.toString();

  try {
    //Author must change
    const author = await ctx.invoke("site/loaders/user.ts");
    if (!author) {
      throw new Error("User not defined");
    }
    await ctx.invoke("blog/actions/submitReview.ts", {
      action: "create",
      additionalType: "submitted",
      reviewBody: reviewBody?.replaceAll("\n", "<br>"),
      itemReviewed: props.itemReviewed,
      isAnonymous: isAnonymous ?? false,
      author,
    });
  } catch (e) {
    logger.error(e);
    return { ...props, openModal: false };
  }

  return props;
}

const ELUX_STYLING = {
  label: "text-secondary font-light",
  textarea:
    "py-3 px-4 border border-neutral rounded-sm font-light text-secondary placeholder:text-[#868687] focus:border-neutral text-base",
  charCount: "text-secondary font-light text-sm",
  extraText: "text-secondary font-light text-sm mt-1",
  input:
    "border border-neutral rounded-sm px-4 h-12 text-base placeholder:text-success-content text-secondary leading-6",
};

const FRIGIDAIRE_STYLING = {
  label: "text-secondary font-medium text-xs",
  textarea:
    "py-3 px-4 border border-neutral rounded-sm font-light text-sm placeholder:text-info text-secondary",
  charCount: "text-secondary font-light text-xs",
  extraText: "text-secondary font-light text-xs",
  input:
    "border border-accent rounded-sm px-4 h-12 text-sm placeholder:text-info text-secondary font-light pt-0.5",
};
