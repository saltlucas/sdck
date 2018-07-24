<?php

/* theme-options/size.twig */
class __TwigTemplate_297c22cf4b28b843eda5f8c8ca70af2a80893c025887b7d169135a123b9d4c73 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = $this->env->loadTemplate("theme-options/base_option.twig");

        $this->blocks = array(
            'variable' => array($this, 'block_variable'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "theme-options/base_option.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 2
        $context["__internal_88b796a0ae942d7a28787dbc7b0a0e45bf5fd20ec4a6fb7e0250e4468eb24f1e"] = $this->env->loadTemplate("form-elements/input.twig");
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 3
    public function block_variable($context, array $blocks = array())
    {
        // line 4
        echo "  <div class=\"ai1ec-col-sm-6 ai1ec-col-xs-9\">
    ";
        // line 5
        echo $context["__internal_88b796a0ae942d7a28787dbc7b0a0e45bf5fd20ec4a6fb7e0250e4468eb24f1e"]->getinput((isset($context["id"]) ? $context["id"] : null), (isset($context["id"]) ? $context["id"] : null), (isset($context["value"]) ? $context["value"] : null), "text", (isset($context["args"]) ? $context["args"] : null));
        echo "
  </div>
";
    }

    public function getTemplateName()
    {
        return "theme-options/size.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  30 => 3,  42 => 7,  38 => 6,  35 => 5,  25 => 2,  39 => 5,  58 => 12,  45 => 9,  37 => 7,  33 => 4,  51 => 10,  47 => 12,  43 => 9,  41 => 8,  36 => 5,  32 => 4,  27 => 3,  23 => 2,  20 => 1,  34 => 6,  31 => 4,  28 => 3,);
    }
}
